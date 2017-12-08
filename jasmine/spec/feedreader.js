/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loop through each feed in the allFeeds object
         * ensure it has a URL defined and that the URL is not empty.
         */
        it('urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });

        });

        /* loop through each feed in the allFeeds object and 
        /* ensure it has a name defined and that the name is not empty.
         */
        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The Menu', function() {
        //menu element is hidden by default. 

        it('menu is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* menu is visibile when the menu icon is clicked.
         */

        it('menu becomes visible', function() {
            //visibility of menu when icon is clicked
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //menu is hidden when icon clicked a second time
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        /* loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least one entry', function(done) {
            var entries = $('.feed .entry').length;
            expect(entries).toBeGreaterThan(0);
            done();
        });

    });


    describe('New Feed Selection', function() {

        //news feed is loaded by the loadFeed function that the content actually changes.

        var originalFeed, refreshFeed

        beforeEach(function(done) {
            loadFeed(0, function() {
                /*figured out how to pull html code for feed list from 
                /*https://discussions.udacity.com/t/unexpected-trouble-with-initial-entries-test/195850
                */
                originalFeed = $('.feed').html();

                loadFeed(1, function() {
                    refreshFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('content changes with new feed', function() {
            expect(originalFeed != refreshFeed).toBe(true);
        })
    })
}());