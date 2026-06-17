function fetchJSONData(path, onCompleted) {
    const timestamp = Date.now();
    fetch(path + "?nc=" + timestamp, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
            onCompleted(data))
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
