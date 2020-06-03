import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuitem'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        啊啊啊
      </header>
      <div>
        <Button> 按钮 噢噢</Button>
        <Button btnType='primary' size='lg'> 按钮 噢噢</Button>
        <Button btnType='link' size='sm'> 按钮 噢噢</Button>
      </div>
      <div>
        <Menu mode='vertical' defaultIndex={'0'} onSelect={(index)=>{
            console.log('点击的索引',index)
        }}>
           <MenuItem index={'0'}>
               <span>啊啊啊</span>
           </MenuItem>
           <MenuItem index={'1'}>
               <span>嘿嘿嘿</span>
           </MenuItem>
           <MenuItem index={'2'}>
               <span>哈哈哈</span>
           </MenuItem>
        </Menu>
      </div>
    </div>
  );
}


export default App;
