import {expect} from 'chai';
describe('Math operations', () => {
    // trong đây chứa tất cả các test case của bộ test
    it('should add two integer', () => {
        const result = 10+10;

        // sử dụng lib  chai để mock kết quả trả về
        expect(result).to.equal(20);
    });

    it('testing with array', () => {
        const arr = [1,2,3];

        // kiểm tra xem phần tử này có trong mảng hay không
        expect(arr).to.include(2);
    })

})

