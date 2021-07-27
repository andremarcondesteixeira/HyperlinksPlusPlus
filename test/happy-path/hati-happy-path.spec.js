import { configureNavigation } from '../../src/lib.js';

describe('hati happy path', () => {
    it('should load content into an specified element by its id using the data-target-id property of an <a> element', async () => {
        const rootElement = document.createElement('div');
        rootElement.innerHTML = `
            <a href="/base/test/happy-path/test1.html" data-target-id="content" data-init>Test 1</a>
            <div id="content"><div>`;

        configureNavigation({ rootElement });

        rootElement.addEventListener('content-loaded', event => event.detail.matchUrl(/^.+\/happy-path\/test1\.html$/, () => {
            console.log(event.detail);
            expect(event.target).to.be.equal(rootElement.querySelector('#content'));
            expect(event.detail.url).to.be.equal('http://localhost:9876/base/test/happy-path/test1.html');
            expect(event.detail.responseStatusCode).to.be.equal(200);
            expect(rootElement.querySelector('#content').innerText.trim()).to.be.equal('Test 1');
            done();
        }));
    });
});
