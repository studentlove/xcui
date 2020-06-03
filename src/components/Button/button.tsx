import React,{FC,AnchorHTMLAttributes,ButtonHTMLAttributes} from 'react'
import classNames from 'classNames'
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
// 接口类型这些 最好也导出去  方便外部使用
interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
// 合并按钮类型
type NativeButtonProps= BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// 合并a标签类型
type AnchorButtonProps= BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// 合并  Partial 让属性变成 可选 
export type ButtonAllProps=Partial<NativeButtonProps & AnchorButtonProps>
// Button:函数组件类型<props类型AllProps,state类型>=
const Button:React.FC<ButtonAllProps>=(props)=>{
    let {
        btnType,
        disabled,
        size,
        children,
        href,
        ...restProps
    }=props
    // 多个class 拼接  //类名: true/false
    // btn btn-lg  btn-primary 
    const classes=classNames('btn',{
        [`btn-${btnType}`]:btnType, // 写了单词 就是true  就有这个类
        [`btn-${size}`]:size,
        'disabled':(btnType==='link') && disabled
    })

    // 渲染 
    if (btnType === 'link'  ) {
      return (
        <a
          className={classes}
          href={href||'#'}
          {...restProps}
        >
          {children}
        </a>
      )
    } else {
      return (
        <button
          className={classes}
          disabled={disabled}
          {...restProps}
        >
          {children}
        </button>
      )
    }
}

// 设置默认值
Button.defaultProps={
  disabled:false,
  btnType:'default'
}

export default Button