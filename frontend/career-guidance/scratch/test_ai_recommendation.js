const test = async () => {
  try {
    const payload = {
      name: 'Ayesha Zafar',
      degree: 'BSCS',
      university: 'NUST',
      gpa: '3.82',
      semester: '6th',
      skills: 'Python: 4/5, React: 3/5',
      interests: 'Programming & Coding, Artificial Intelligence',
      recommended_career: 'Software Engineer'
    };

    console.log('Sending request to AI Recommendation endpoint...');
    const res = await fetch('http://localhost:8000/api/ai-recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log(`Status: ${res.status}`);
    const data = await res.json();
    console.log('Response:', data);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

test();
