(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('book')
        .service('bookService', ['bookFactory', function(bookFactory) {
            this.getBooks = getBooks;
            this.getBook = getBook;
            this.postBook = postBook;
            this.putBook = putBook;
            this.deleteBook = deleteBook;

            function getBooks() {
                return bookFactory.query().$promise;
            }

            function getBook(_id) {
                return bookFactory.get({book_id: _id}).$promise;
            }

            function postBook(createData) {
                var book = new bookFactory(createData);
                return book.$save();
            }

            function putBook(updateData) {
                var book = new bookFactory(updateData);
                return book.$update();
            }

            function deleteBook(_id) {
                var book = new bookFactory();
                return book.$delete({book_id: _id});
            }
        }]);
})();