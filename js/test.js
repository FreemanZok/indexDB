// Function to store audio file in IndexedDB
function storeAudioInDB(file) {
    // Open IndexedDB
    const request = indexedDB.open('AudioDatabase', 1);
  
    // Create object store
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore('AudioStore', { keyPath: 'id', autoIncrement: true });
    };
  
    // Store audio file in the object store
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['AudioStore'], 'readwrite');
      const store = transaction.objectStore('AudioStore');
      const addRequest = store.add(file);
  
      addRequest.onsuccess = function() {
        console.log('Audio file stored in IndexedDB.');
      };
  
      addRequest.onerror = function() {
        console.error('Error storing audio file in IndexedDB.');
      };
    };
  
    request.onerror = function() {
      console.error('Error opening IndexedDB.');
    };
  }
  
  // Function to retrieve audio file from IndexedDB and play it
  function playAudioFromDB() {
    // Open IndexedDB
    const request = indexedDB.open('AudioDatabase', 1);
  
    // Retrieve audio file from the object store
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['AudioStore'], 'readonly');
      const store = transaction.objectStore('AudioStore');
      const getRequest = store.getAll();
  
      getRequest.onsuccess = function() {
        const audioData = getRequest.result[0];
  
        if (audioData) {
          const audioBlob = new Blob([audioData], { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(audioBlob);
  
          // Create an audio element and set the source to the retrieved audio URL
          const audioElement = document.createElement('audio');
          audioElement.src = audioUrl;
  
          // Append the audio element to the document body
          document.body.appendChild(audioElement);
  
          // Play the audio
          audioElement.play();
        } else {
          console.log('No audio file found in IndexedDB.');
        }
      };
  
      getRequest.onerror = function() {
        console.error('Error retrieving audio file from IndexedDB.');
      };
    };
  
    request.onerror = function() {
      console.error('Error opening IndexedDB.');
    };
  }
  
  
  // To play the audio, call the playAudioFromDB function
  playAudioFromDB();




  function uploadAndStoreAudioFile(file) {
    // Open IndexedDB
    const request = indexedDB.open('AudioDatabase', 1);
  
    // Create object store
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore('AudioStore', { keyPath: 'id', autoIncrement: true });
    };
  
    // Store audio file in the object store
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['AudioStore'], 'readwrite');
      const store = transaction.objectStore('AudioStore');
      const addRequest = store.add(file);
  
      addRequest.onsuccess = function() {
        console.log('Audio file stored in IndexedDB.');
      };
  
      addRequest.onerror = function() {
        console.error('Error storing audio file in IndexedDB.');
      };
    };
  
    request.onerror = function() {
      console.error('Error opening IndexedDB.');
    };
  }
  
  // Example usage
  const audioInput = document.getElementById('audio-input'); // Replace 'audio-input' with the ID of your file input element
  console.log(audioInput)
  audioInput.addEventListener('change', function(event) {
    alert("fuck")
    const file = event.target.files[0];
    storeAudioInDB(file);
  });

