import React from 'react'
import { render ,fireEvent } from '@testing-library/react'
import Button ,{ ButtonAllProps } from './button'
// react 组件测试  -随便测试
// it test 都可以
test('my first component button',()=>{
    const wrapper=render(<Button>nice</Button>)
    const element=wrapper.queryByText('nice')
    expect(element).toBeTruthy()

    // 拓展的测试  jest-dom
    expect(element).toBeInTheDocument()
})
// 分类测试  describe 分开很多而已 
const defaultProps = {
    onClick: jest.fn()
  }
const testProps: ButtonAllProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'klass'
  }
  
  const disabledProps: ButtonAllProps = {
    disabled: true,
    onClick: jest.fn(),
  }
describe('test Button component', () => {
    it('should render the correct default button', () => {
      const wrapper = render(<Button {...defaultProps}>Nice</Button>)
      const element = wrapper.getByText('Nice') as HTMLButtonElement
      expect(element).toBeInTheDocument()
      expect(element.tagName).toEqual('BUTTON')
      expect(element).toHaveClass('btn btn-default')
      expect(element.disabled).toBeFalsy()
      //   测试点击
      fireEvent.click(element)
      expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('should render the correct component based on different props', () => {
        // 测试props
      const wrapper = render(<Button {...testProps}>Nice</Button>)
      const element = wrapper.getByText('Nice')
      expect(element).toBeInTheDocument()
      // btn-primary btn-lg klass 错误 
      expect(element).toHaveClass('klass')
    })
    it('should render a link when btnType equals link and href is provided', () => {
        // 测试a
      const wrapper = render(<Button btnType='link' href="http://dummyurl">Link</Button>)
      const element = wrapper.getByText('Link')
      expect(element).toBeInTheDocument()
      expect(element.tagName).toEqual('A')
      expect(element).toHaveClass('btn btn-link')
    })
    it('should render disabled button when disabled set to true', () => {
      const wrapper = render(<Button {...disabledProps}>Nice</Button>)
      const element = wrapper.getByText('Nice') as HTMLButtonElement
      expect(element).toBeInTheDocument()
      expect(element.disabled).toBeTruthy()
      fireEvent.click(element)
      expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
  })