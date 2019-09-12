---
title: "Test your API with FrisbyJS"
date: "2019-01-26"
description: "Test your API with FrisbyJS"
---

Unit testing your code is great but some times you want to be able to test outside of your unit test stack.

In my case, I wanted to run a set of tests against my API after deployment to validate functionality. Part integration test, part acceptance test, part smoke test, part contract test, whatever.

A tool I like for this purpose is a node.js framework called [Frisby.js](https://www.frisbyjs.com). Frisby will perform HTTP calls and allow for assertions on the results. Frisby supports all of the common HTTP verbs (get, post, put, delete) or you can roll your own http call using fetch.

Assertions are done in a few ways:
* Ensure certain headers or response codes are returned as expected
* Ensure the response body adheres to a schema using [joi](https://github.com/hapijs/joi) to expect a specified schema or if you want more control you can inspect the response and use jasmine expect
* Break out and inspect the response body and build custom [jest](https://jestjs.io/) expectations (which are styled just like jasmines)

Thanks to the [json placeholder](https://jsonplaceholder.typicode.com/), I wrote up a few example tests demonstrating these three items:

```
const frisby = require('frisby');
const Joi = frisby.Joi;
const todoApi = 'https://jsonplaceholder.typicode.com/todos';

describe('Todos', function () {
    // expect status code 200
    it('should return 200', function () {
        return frisby.get(todoApi)
            .expect('status', 200)
    });
    // expect body schema
    it('should return a list of todos', function () {
        return frisby.get(todoApi)
            .expect('jsonTypes', '*', {
                'userId': Joi.number().required(),
                'id': Joi.number().required(),
                'title': Joi.string().required(),
                'completed': Joi.bool().required()
            });
    });
    // custom expect assertion
    it('should return ordered by id asc', function () {
        return frisby.get(todoApi)
            .then((response) => {
                expect(response.json[0].id).toBe(1);
                expect(response.json[1].id).toBe(2);
                // and so on
            });
    });
});
```

So as you can see, you can get quite a bit of value from testing with frisby. Because it leverages jest it is also possible to collect the test results using the command line using `--json --outputFile=<output file name>`