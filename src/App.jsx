import React, { useState, useEffect } from 'react';
import { Gift, RefreshCcw, Search, Shuffle, Heart } from "lucide-react";

const AnniversarySelector = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [activityList, setActivityList] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [revealedActivities, setRevealedActivities] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isShufflingActivities, setIsShufflingActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [completedActivities, setCompletedActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('anniversary-completed-activities');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      console.error('Error loading from localStorage:', e);
      return new Set();
    }
  });
  const [activities, setActivities] = useState({});
  const [searchPhrases, setSearchPhrases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const activitiesResponse = await fetch('/activities.json');
        const loadedActivities = await activitiesResponse.json();
        setActivities(loadedActivities);

        const phrasesResponse = await fetch('/phrases.json');
        const loadedPhrases = await phrasesResponse.json();
        setSearchPhrases(loadedPhrases);
        setSearchPhrase(loadedPhrases[0]);

        setIsLoading(false);
      } catch (e) {
        console.error('Error loading resources:', e);
        setError(`Unable to load activity data: ${e.message}`);
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'anniversary-completed-activities', 
        JSON.stringify(Array.from(completedActivities))
      );
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [completedActivities]);

  useEffect(() => {
    let phraseInterval;
    if (isShuffling && searchPhrases.length > 0) {
      phraseInterval = setInterval(() => {
        setSearchPhrase(prevPhrase => {
          const currentIndex = searchPhrases.indexOf(prevPhrase);
          const nextIndex = (currentIndex + 1) % searchPhrases.length;
          return searchPhrases[nextIndex];
        });
      }, 1200);
    }
    return () => clearInterval(phraseInterval);
  }, [isShuffling, searchPhrases]);

  const letters = Object.keys(activities).sort();

  const getRandomActivities = (fullList, count = 3) => {
    const shuffled = [...fullList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleLetterSelect = async (letter) => {
    setSelectedLetter(letter);
    setIsShuffling(true);
    setIsRevealed(true);
    setSelectedActivity(null);
    setSearchPhrase(searchPhrases[Math.floor(Math.random() * searchPhrases.length)]);
    
    const selectedActivities = getRandomActivities(activities[letter]);
    setActivityList(selectedActivities);
    setRevealedActivities([]);
    
    for (let i = 0; i < selectedActivities.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setRevealedActivities(prev => [...prev, i]);
    }
    
    setIsShuffling(false);
  };

  const handleShuffleActivities = async () => {
    setIsShufflingActivities(true);
    setRevealedActivities([]);
    setSelectedActivity(null);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newActivities = getRandomActivities(activities[selectedLetter]);
    setActivityList(newActivities);
    
    for (let i = 0; i < newActivities.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setRevealedActivities(prev => [...prev, i]);
    }
    
    setIsShufflingActivities(false);
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity === selectedActivity ? null : activity);
  };

  const handleHeartClick = (activity) => {
    const newCompleted = new Set(completedActivities);
    if (newCompleted.has(activity)) {
      newCompleted.delete(activity);
    } else {
      newCompleted.add(activity);
    }
    setCompletedActivities(newCompleted);
  };

  const resetSelection = () => {
    setSelectedLetter(null);
    setActivityList([]);
    setIsRevealed(false);
    setIsShuffling(false);
    setRevealedActivities([]);
    setIsShufflingActivities(false);
    setSelectedActivity(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="anniversary-card">
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin mr-2">
              <Search className="h-6 w-6 text-gray-500" />
            </div>
            <span>Loading activities...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="anniversary-card">
          <div className="p-8 text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="anniversary-card">
        <h1 className="text-2xl font-bold text-center mb-4">
          26th Anniversary Activity Selector
        </h1>
        
        {!isRevealed ? (
          <>
            <p className="text-center mb-6">
              After drawing a letter tile, click the corresponding button below to reveal your anniversary activity options!
            </p>
            <div className="scrabble-grid">
              {letters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterSelect(letter)}
                  className="scrabble-tile"
                >
                  {letter}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            {isShuffling ? (
              <div className="flex items-center justify-center mb-4">
                <div className="animate-spin mr-2">
                  <Search className="h-6 w-6 text-purple-500" />
                </div>
                <span className="text-purple-500 transition-opacity duration-300">
                  {searchPhrase}
                </span>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">
                  Your letter: {selectedLetter}
                </h3>
                <div className="space-y-2">
                  {activityList.map((activity, index) => (
                    <div
                      key={`${activity}-${index}`}
                      onClick={() => handleActivitySelect(activity)}
                      className={`anniversary-activity ${activity === selectedActivity ? 'selected' : ''}`}
                    >
                      <div className="activity-icon-wrapper">
                        <Gift className="activity-gift" />
                      </div>
                      <span className="activity-text">{activity}</span>
                      <div className="activity-icon-wrapper">
                        <Heart
                          className={`activity-heart ${completedActivities.has(activity) ? 'filled' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHeartClick(activity);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {!isShufflingActivities && (
                  <div className="button-row">
                    <button
                      onClick={handleShuffleActivities}
                      className="selector-button"
                    >
                      <Shuffle className="w-4 h-4" />
                      Shuffle
                    </button>
                    <button
                      onClick={resetSelection}
                      className="selector-button"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      New Letter
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnniversarySelector;  