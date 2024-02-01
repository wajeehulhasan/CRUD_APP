import http from 'http';


export const homesRoutes = (req, res) => {
    const request = http.get('http://localhost:8000/api/users', (response) => {
        let data = '';
        // console.log(response.data)
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const responseData = JSON.parse(data);
                console.log(responseData);
                res.render('index', { users: responseData });
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    });

    request.on('error', (error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
};

export const add_user = (req, res) => {
    res.render('add_user');
};


export const update_user = (req, res) => {
    const options = {
        hostname: 'localhost',
        port: 8000,
        path: `/api/users?id=${req.query.id}`,
        method: 'GET',
    };

    const request = http.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const userData = JSON.parse(data);
                res.render('update_user', { user: userData });
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    });

    request.on('error', (error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });

    request.end();
};