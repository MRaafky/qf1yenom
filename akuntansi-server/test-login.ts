// Native fetch is available in Node 18+
// Node 18+ has native fetch.

async function testLogin() {
    const url = 'http://localhost:3000/api/auth/login';
    const credentials = {
        email: 'admin@akuntans.com',
        password: 'admin123'
    };

    try {
        console.log('Testing login to:', url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Login Successful!');
            console.log('Status:', response.status);
            console.log('Token received:', data.token ? 'Yes (starts with ' + data.token.substring(0, 10) + '...)' : 'No');
            console.log('Message:', data.message);
        } else {
            console.error('❌ Login Failed');
            console.error('Status:', response.status);
            console.error('Error:', data);
        }

    } catch (error) {
        console.error('❌ Network Error:', error);
    }
}

testLogin();
