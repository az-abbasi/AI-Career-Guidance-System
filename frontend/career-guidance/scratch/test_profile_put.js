const test = async () => {
  const payload = {
    name: 'Test Student',
    university: 'Test University',
    degree: 'BSCS'
  };

  try {
    console.log('Sending PUT to http://localhost:8000/api/profile...');
    const res = await fetch('http://localhost:8000/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Let's use a mock token or get the active token
        'Authorization': 'Bearer mock-admin-token-xyz'
      },
      body: JSON.stringify(payload)
    });

    console.log(`Status: ${res.status}`);
    const text = await res.text();
    console.log(`Response: ${text}`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

test();
