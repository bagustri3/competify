import { Button } from 'antd'
import React from 'react'

function CustomButton({ handleClick, btnType, title, styles}) {
  return (
    <Button
        type={btnType}
        className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
        onClick={handleClick}
    >
        {title}
    </Button>
  )
}

export default CustomButton