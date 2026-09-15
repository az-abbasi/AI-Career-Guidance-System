const test = async () => {
  const urls = [
    'https://career-backend-production-c833.up.railway.app/api/careers',
    'http://localhost:8000/api/careers',
    'http://127.0.0.1:8000/api/careers'
  ];

  for (const url of urls) {
    try {
      console.log(`Testing ${url}...`);
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      console.log(`Status: ${res.status}`);
      if (res.status === 200) {
        const data = await res.json();
        console.log(`Success! Found ${data.length || Object.keys(data).length} careers.\n`);
      } else {
        console.log(`Failed with status ${res.status}\n`);
      }
    } catch (e) {
      console.log(`Error: ${e.message}\n`);
    }
  }
};

test();
