import AxiosInstance from "./Interceptor";
import appGlobal from '../../constants/appglobal';
import React, { useState } from 'react';
import * as _ from 'lodash';
export const APIContext = React.createContext({});

export const APIProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [onGoingContentWithSection, setOnGoingContentWithSection] = useState([]);
  const [assessmentScore, setAssessmentScore] = useState([])
  const [contentWithSection, setContentWithSection] = useState([]);
  const [storecontentWithSection, setStoreContentWithSection] = useState([]);
  const [recommendedContent, setRecommendedContent] = useState([]);
  const [apiLoader, setApiLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryForProfile, setCategoryForProfile] = useState([]);
  const [consumption, setConsumption] = useState([]);
  const [followingCategory, setFollowingCategory] = useState([]);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [checkStatus, setCheckStatus] = useState('error')
  return (
    <APIContext.Provider
      value={{
        content,
        onGoingContentWithSection, // used for home to show only the ongoing content
        contentWithSection, // used for search(Guide) tab to show all the content
        assessmentScore, // used to show the assessment data reports
        apiLoader,
        category,
        consumption,
        recommendedContent,
        followingCategory,
        inProgressCount,
        completedCount,
        categoryForProfile,
        getContent: () => {
          setApiLoader(false);
          AxiosInstance.get(appGlobal.APIEndpoints.content)
            .then((response) => {
              if (response) {
                const result = response.data;
                if (result && result.length) {
                  const data = [];
                  result.forEach((content) => {
                    const medias = [];
                    if (content.media && content.media.length) {
                      content.media.forEach((media) => {
                        const { artist, artwork } = JSON.parse(media.meta);
                        medias.push({
                          id: media.id,
                          url: media.name,
                          type: media.type,
                          description: media.description,
                          artist,
                          artwork,
                          createdAt: media.createdAt,
                          updatedAt: media.updatedAt
                        })
                      })
                    }
                    data.push({
                      id: content.id,
                      title: content.title,
                      description: content.description,
                      media: medias,
                      createdAt: content.createdAt,
                      updatedAt: content.updatedAt
                    });
                  });
                  setApiLoader(false);
                  setContent(data);
                }
              }
            })
            .catch((error) => { setApiLoader(false) });
        },
        getContentWithSubSection: () => {
          setApiLoader(true);
          AxiosInstance.get(appGlobal.APIEndpoints.onGoingConsumptionMedia)
            .then((response) => {
              if (response) {
                const data = response.data;
                if (data && data.length) {
                  const newData = [];
                  data.forEach((content) => {
                    const currentSubsection = [];
                    const titles = [];
                    var image = '';
                    if (content.media) {
                      const data = JSON.parse(content.media[0].meta);
                      image = data.artwork;
                    }
                    var isCompleted = true;
                    if (content.contentsubsection !== null) {
                      content.contentsubsection.forEach((contentSubsection, index) => {
                        const medias = [];
                        var stepperCurrentPosition = null;
                        let totallength = 0;
                        let consumptionlength = 0;
                        titles.push(contentSubsection.title);
                        contentSubsection.media.forEach((subsectionMedias) => {
                          const { artist, artwork } = JSON.parse(subsectionMedias.meta);
                          if (subsectionMedias.totallength && subsectionMedias.consumptionlength) {
                            totallength = subsectionMedias.totallength;
                            consumptionlength = subsectionMedias.consumptionlength;
                          } else {
                            totallength = 0;
                            consumptionlength = 0;
                          }
                          const calculatePercent = totallength / 100 * 95;
                          //to check whether the media has been consumed above 95% or not
                          if (subsectionMedias.totallength && calculatePercent === consumptionlength || consumptionlength > calculatePercent) {
                            stepperCurrentPosition = null;
                          } else {
                            isCompleted = false;
                            stepperCurrentPosition = index + 1;
                          }

                          medias.push({
                            ...subsectionMedias,
                            consumptionlength: consumptionlength,
                            artist: artist,
                            artwork: artwork,
                            totallength: totallength,
                            contentId: content.id,
                            subSectionId: contentSubsection.id,
                            subsectionName: contentSubsection.title,
                          })

                          //if any of the subsection media is not consumed over 95% that subsection will be taken as currentSubsection 
                          if (stepperCurrentPosition !== null) {
                            currentSubsection.push({
                              totalStepCount: content.contentsubsection.length,
                              currentPostion: stepperCurrentPosition,
                              title: contentSubsection.title,
                              media: contentSubsection,
                              id: contentSubsection.id,
                              alltitle: titles
                            })
                          }
                        })
                        //pass the new formed medias into each contentSubsection's media
                        contentSubsection.media = medias;

                      })
                    } else {
                      isCompleted = false;
                    }
                    newData.push({
                      ...content,
                      currentsubsection: currentSubsection,
                      isCompleted: isCompleted,
                      artwork: image
                    })
                  })
                  let inProgress = 0;
                  let isCompleted = 0;
                  newData.forEach((subSection, i) => {
                    if (subSection.currentsubsection.length !== 0) {
                      inProgress++;
                    }
                    if (subSection.isCompleted) {
                      isCompleted++;
                    }
                  });
                  setInProgressCount(inProgress);
                  setCompletedCount(isCompleted);
                  setOnGoingContentWithSection(newData);
                }
                setApiLoader(false);
              }
            })
            .catch((error) => { setApiLoader(false) });
        },
        getMediaConsumptionByMediaId: (mediaId) => {
          return new Promise((resolve, reject) => {
            setApiLoader(true);
            AxiosInstance.get(
              `${appGlobal.APIEndpoints.getContentConsumptionByMedia}${mediaId}`
            )
              .then((response) => {
                setApiLoader(false);
                if (response) {
                  const result = response.data;
                  resolve(result);
                }
              }).catch((error) => { reject(error); setApiLoader(false) });
          })
        },
        getConsumption: () => {
          setApiLoader(true);
          AxiosInstance.get(
            `${appGlobal.APIEndpoints.consumption}`
          )
            .then((response) => {
              setApiLoader(false);
              const data = [];
              response.data.forEach((content) => {
                const { artwork } = JSON.parse(content.meta);
                data.push({
                  id: content.mediaid,
                  totallength: content.totallength,
                  consumptionlength: content.consumptionlength,
                  type: content.type,
                  description: content.description,
                  image: artwork,
                  url: content.mediaurl,
                  name: content.medianame,
                  contentId: content.contentid,
                  medianame: content.medianame,
                });
              });
              setConsumption(data);
            }).catch(() => { setApiLoader(false) });
        },
        postMediaConsumption: (body) => {
          AxiosInstance.post(
            `${appGlobal.APIEndpoints.consumption}`, body
          )
            .then(() => { }).catch(() => { });
        },
        putMediaConsumption: (id, body) => {
          AxiosInstance.put(
            `${appGlobal.APIEndpoints.consumption}/${id}`, body
          )
            .then(() => { }).catch(() => { });
        },
        getCategory: () => {
          setApiLoader(true);
          AxiosInstance.get(`${appGlobal.APIEndpoints.category}`)
            .then((response) => {
              if (response) {
                const result = response.data;
                const data = [];
                const profileData = [];
                result.forEach(o => {
                  const { artwork } = JSON.parse(o.meta);
                  o.contentsubsection.forEach(c => {
                    const categoryIndex = data.findIndex(t => t.categoryTitle == c.title);
                    if (categoryIndex != -1) {
                      const d = {
                        ...o,
                        artwork: JSON.parse(o.meta).artwork,
                        media: c.media,
                        tags: o.contentsubsection.map(o => { return o.title })
                      };
                      d.media.map(media => {
                        media.artist = JSON.parse(media.meta).artist;
                        media.artwork = JSON.parse(media.meta).artwork
                      });
                      delete d.meta;
                      delete d.contentsubsection;
                      data[categoryIndex].subsection.push(d);
                    } else {
                      const d = {
                        ...o,
                        artwork: JSON.parse(o.meta).artwork,
                        media: c.media,
                        tags: o.contentsubsection.map(o => { return o.title })
                      };
                      delete d.meta;
                      delete d.contentsubsection;
                      d.media.map(media => {
                        media.artist = JSON.parse(media.meta).artist;
                        media.artwork = JSON.parse(media.meta).artwork;
                      });
                      data.push({
                        categoryTitle: c.title,
                        categoryId: c.id,
                        subsection: [d]
                      });
                    }
                  })
                  // order 
                });
                setCategory(data);
                setApiLoader(false)
              }
            })
            .catch(() => { setApiLoader(false) });
        },
        search: (searchText) => {
          return new Promise((resolve, reject) => {
            const searchData = [];
            setApiLoader(true);
            if (searchText) {
              AxiosInstance.get(appGlobal.APIEndpoints.search, { params: { searchString: searchText } })
                .then((response) => {
                  setApiLoader(false);
                  if (response) {
                    const data = response.data;
                    if (data.length > 0) {
                      data.forEach(o => {
                        const { artwork } = JSON.parse(o.meta);
                        searchData.push({
                          ...o,
                          artwork,
                        });
                      })
                    }
                    resolve(searchData);
                  }
                })
                .catch((err) => { reject(err); setApiLoader(false); })
            }
          })
        },
        getContentWithSection: () => {
          setApiLoader(true);
          AxiosInstance.get(`${appGlobal.APIEndpoints.contentWithSection}`)
            .then((response) => {
              if (response) {
                const data = [];
                response.data.forEach(o => {
                  var image = '';
                  if (o.media) {
                    const data = JSON.parse(o.media[0].meta);
                    image = data.artwork;
                  }
                  data.push({
                    id: o.id,
                    title: o.title,
                    description: o.description,
                    artwork: image
                  });
                })
                setContentWithSection(data);
                setStoreContentWithSection(response.data);
                setApiLoader(false);
              }
            })
            .catch(() => { setApiLoader(false) });
        },
        getAllContentsConsumptionWithSection: () => {
          setApiLoader(true);
          AxiosInstance.get(appGlobal.APIEndpoints.allcontentsconsumptionwithsection)
            .then((res) => {
              setApiLoader(false);
              if (res) {
                const { data } = res;
                let scores = [];

                if (data && data.length) {
                  data.forEach(content => {
                    if (content.contentsubsection !== null) {
                      content.contentsubsection.forEach((contentSubsection, index) => {
                        if (contentSubsection.media) {
                          contentSubsection.media.forEach((subsectionMedias) => {
                            // checking if the sub section is already added then just update the media count and percentage
                            // else add a new entry to the scores array
                            const previousScoreIndex = scores.findIndex(o => o.subsectionName == contentSubsection.title);
                            if (previousScoreIndex != -1) {
                              if (subsectionMedias.totallength !== null || subsectionMedias.consumptionlength !== null) {
                                scores[previousScoreIndex].consumedMediaCount += 1;
                              }
                              scores[previousScoreIndex].totalMediaCount += 1;
                              scores[previousScoreIndex].percentage = Math.round((scores[previousScoreIndex].consumedMediaCount / scores[previousScoreIndex].totalMediaCount) * 100);
                            } else {
                              scores.push({
                                subsectionName: contentSubsection.title,
                                description: contentSubsection.description,
                                consumedMediaCount: 1,
                                totalMediaCount: 1,
                                percentage: 100
                              })
                            }
                          });
                        }
                      });
                    }
                  });
                  // sorting scores by percentange in descending order to make sure the first card has the highest number
                  // TO DO
                  scores = _.orderBy(scores, ['percentage'], ['desc']);
                  setAssessmentScore(scores);
                }
              }
            }).catch((err) => { setApiLoader(false); });
        },
        getRecommendedContent: () => {
          AxiosInstance.get(`${appGlobal.APIEndpoints.getRecommendedcontent}`)
            .then((response) => {
              if (response.data) {
                const result = response.data;
                const data = [];
                result.forEach(o => {
                  var image = '';
                  if (o.media) {
                    const data = JSON.parse(o.media[0].meta);
                    image = data.artwork;
                  }
                  data.push({
                    ...o,
                    artwork: image
                  })
                })
                setRecommendedContent(data);
              }
            })
            .catch(() => { });
        },
        putFollowForCategory: (id, body) => {
          AxiosInstance.put(
            `${appGlobal.APIEndpoints.category}/${id}`, body
          )
            .then(() => { }).catch(() => { });
        },
        getCategortDetail: (categoryId) => {
          return new Promise((resolve, reject) => {
            setApiLoader(true);
            AxiosInstance.get(`${appGlobal.APIEndpoints.getCategoryDetail}${categoryId}`)
              .then((response) => {
                if (response) {
                  const result = response.data;
                  const tags = [];
                  const medias = [];
                  const followBy = [];
                  const { artwork } = JSON.parse(result.meta);
                  result.contentsubsection.forEach(o => {
                    let contentId = 0;
                    storecontentWithSection.forEach(s => {
                      if (s.contentsubsection) {
                        s.contentsubsection.forEach(c => {
                          if (c.id === o.id) {
                            contentId = s.id;
                          }
                        })
                      }
                    })
                    tags.push(o.title);
                    o.media.forEach(c => {
                      const { artist, artwork } = JSON.parse(c.meta);
                      medias.push({
                        ...c,
                        artist: artist,
                        artwork: artwork,
                        contentId: contentId
                      })
                    })
                  })
                  if (result.followedby) {
                    followBy.push(JSON.parse(result.followedby));
                  }
                  const data = {
                    ...result,
                    tags: tags,
                    artwork: artwork,
                    media: medias,
                    followed: followBy[0]
                  }
                  resolve(data);
                  setApiLoader(false);
                }
              }).catch((error) => { reject(error); setApiLoader(false) });
          })
        },
        getFollowingCategory: () => {
          setApiLoader(true);
          setTimeout(() => {
            AxiosInstance.get(`${appGlobal.APIEndpoints.getFollowingCategory}`)
              .then((response) => {
                if (response) {
                  const result = response.data;
                  const data = [];
                  result.forEach(o => {
                    const followBy = [];
                    const { artwork } = JSON.parse(o.meta);
                    followBy.push(JSON.parse(o.followedby));
                    data.push({
                      ...o,
                      artwork: artwork,
                      followed: followBy[0]
                    })
                  })
                  setFollowingCategory(data);
                  setApiLoader(false);
                }
              }).catch((error) => { setApiLoader(false) });
          }, 1000);
        },
        getCourseDetail: (courseId) => {
          return new Promise((resolve, reject) => {
            setApiLoader(true);
            AxiosInstance.get(`${appGlobal.APIEndpoints.contentconsumptionbycontent}/${courseId}`)
              .then((response) => {
                if (!response.data.status) {
                  const result = response.data;
                  if (result) {
                    var image = '';
                    if (result.media) {
                      const data = JSON.parse(result.media[0].meta);
                      image = data.artwork;
                    }
                    if (result.contentsubsection) {
                      result.contentsubsection.forEach(c => {
                        const medias = [];
                        c.media.forEach(d => {
                          const { artist, artwork } = JSON.parse(d.meta);
                          medias.push({
                            ...d,
                            artist: artist,
                            artwork: artwork,
                            contentId: result.id
                          })
                        })
                        c.media = medias;
                      })
                    }
                    const data = {
                      ...result,
                      artwork: image
                    }
                    resolve(data);
                  }
                } else {
                  resolve('error');
                }
                setApiLoader(false);
              }).catch((error) => { reject(error); setApiLoader(false) });
          })
        },
        getDetail: (courseId) => {
          return new Promise((resolve, reject) => {
            AxiosInstance.get(`${appGlobal.APIEndpoints.getNotConsumedCourseDetail}/${courseId}`)
              .then((response) => {
                const result = response.data;
                if (result) {
                  var image = '';
                  if (result.media) {
                    const data = JSON.parse(result.media[0].meta);
                    image = data.artwork;
                  }
                  if (result.contentsubsection) {
                    result.contentsubsection.forEach(c => {
                      const medias = [];
                      if (c.media) {
                        c.media.forEach(d => {
                          const { artist, artwork } = JSON.parse(d.meta);
                          medias.push({
                            ...d,
                            artist: artist,
                            artwork: artwork,
                            contentId: result.id
                          })
                        })
                        c.media = medias;
                      }
                    })
                  }
                  const data = {
                    ...result,
                    artwork: image
                  }
                  resolve(data);
                }
                setApiLoader(false);
              }).catch((error) => { reject(error); setApiLoader(false) });
          })
        },
        getCategoryForProfile: (id) => {
          setApiLoader(true);
          AxiosInstance.get(`${appGlobal.APIEndpoints.category}`)
            .then((response) => {
              if (response) {
                const result = response.data;
                const data = [];
                result.forEach(o => {
                  var isFollowed = false;
                  const followedData = [];
                  const { artwork } = JSON.parse(o.meta);
                  if (o.followedby) {
                    const followUers = JSON.parse(o.followedby);
                    if (followUers.length !== 0) {
                      followUers.forEach(u => {
                        followedData.push(u);
                        if (u.userid && u.userid === id) {
                          isFollowed = true;
                        }
                      })
                    }
                  }
                  data.push({
                    ...o,
                    artwork: artwork,
                    isFollowing: isFollowed,
                    followedData: followedData
                  })
                })
                setApiLoader(false);
                setCategoryForProfile(data);
              }
            })
            .catch(() => { setApiLoader(false) });
        },
      }}>{children}</APIContext.Provider>
  )

  // const checkMediaConsumption = (mediaId, subSectionId, contentId, consumptionLength) => {
  //   const contentIndex = onGoingContentWithSection.findIndex(o => o.id == contentId);
  //   if (contentIndex != -1) {
  //     const content = onGoingContentWithSection[contentIndex];
  //     const subSectionIndex = content.currentsubsection.findIndex(o => o.id == subSectionId);
  //     if (subSectionIndex != -1) {
  //       const subSection = content.currentsubsection[subSectionIndex];
  //       const mediaIndex = subSection.media.media.findIndex(o => o.id == mediaId);
  //       if (mediaIndex != -1) {
  //         const media = subSection.media.media[mediaIndex];
  //         const calculatePercent = media.totallength / 100 * 95;
  //         //to check whether the media has been consumed above 95% or not
  //         if (calculatePercent === consumptionLength || consumptionLength > calculatePercent) {
  //           subSection.media.media.splice(mediaIndex, 1);
  //           const data = onGoingContentWithSection;
  //           if (!subSection.media.media.length) {
  //             if (content.currentsubsection.length) {
  //               content.currentsubsection.splice(subSectionIndex, 1);
  //             }
  //           }
  //           // change the consumption length
  //           // delete the content if all the subsection are done
  //           data[contentIndex] = {
  //             ...data[contentIndex],
  //             currentsubsection: [...data[contentIndex].currentsubsection, ...[subSection]]
  //           }
  //           setOnGoingContentWithSection(data)
  //         }
  //       }
  //     }
  //   }
  // }
}

