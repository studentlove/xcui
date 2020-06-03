// npx jest jest.test.js --watch          带test的文件认为是 测试文件
test('test common na',()=>{
    expect(2+2).toBe(4)

    expect(2+2).not.toBe(5)
})