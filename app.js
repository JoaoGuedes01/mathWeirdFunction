const express = require('express');
const fs = require('fs');
const app = express();
app.listen(3000);

app.get('/',(req,res)=>{
    return res.sendFile(__dirname+'/index.html');
})


app.get('/runMath/:iterations', (req, res) => {
    let number = 1;
    let count = 0;
    let results = [];
    let iterations = req.params.iterations;

    for (i = 1; i <= iterations; i++) {
        count = 0;
        number = i;
        let result = {
            InitialNumber: null,
            count: null,
            path: []
        };
        result.InitialNumber = number;
        while (true) {
            number = runFormula(number);
            result.path.push(number);
            count++;
            if (number == 1) {
                result.count = count;
                results.push(result);
                break;
            }
        }
    }

    let jsonString = JSON.stringify(results);

    /*fs.writeFile('results.json', jsonString, 'utf8', function (err) {
        if (err) return console.log(err);
        console.log('Results written to file');
    });*/
    return res.send(results);
})

function runFormula(number) {
    if (number % 2) {
        return 3 * number + 1;
    } else {
        return number / 2;
    }
}

