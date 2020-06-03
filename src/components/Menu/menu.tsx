import React ,{useState,createContext} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuitem'

type MenuMode = 'vertical' | 'horizontal'
type SelectCallBack=(selectedIndex:string)=>void
interface MenuProps{
    defaultIndex?:string,
    classname?:string,
    mode?:MenuMode,
    style?:React.CSSProperties,
    onSelect?:SelectCallBack
}

interface IMenuContext{
    index:string,
    onSelect?:SelectCallBack
}
// 创建 createContext 祖孙传值  谁用谁需要拿他
export const MenuContext=createContext<IMenuContext>({index:'0'})


const Menu:React.FC<MenuProps>=(props)=>{
    let {defaultIndex,classname,mode,style,onSelect,children} = props
    // 传来的默认值 useState(0)
    let [currentActive,setActive] =useState(defaultIndex)
    const handleClick=(index:string)=>{
        setActive(index) //修改选中的 索引
        if(onSelect){
            onSelect(index)
        }
    }
    // 祖宗的 对象 传入 
    let passContext:IMenuContext ={
        index:currentActive ? currentActive : '0',
        onSelect:handleClick
    }
    let classes=classNames('xc-menu',classname,{
        'menu-vertical':mode==='vertical'
    })
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>
          const { displayName } = childElement.type
          if (displayName === 'MenuItem' || displayName === 'SubMenu') {
            //   加上索引
            return React.cloneElement(childElement, {
              index: index.toString()
            })
          } else {
            console.error("Warning: Menu has a child which is not a MenuItem component")
          }
        })
      }
    return (
        <ul className={classes} style={style} >
            {/* 祖孙传值  必须叫 value */}
            <MenuContext.Provider value={passContext}>
                 {renderChildren()}
            </MenuContext.Provider>
           
        </ul>
    )
}

Menu.defaultProps={
    mode:'horizontal',
    defaultIndex:'0'
}

export default Menu