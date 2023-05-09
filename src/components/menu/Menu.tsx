import { useState } from 'react'
import './Menu.css'

type Props = {
    onAction(action: 'reset-game' | 'reset-all') : void
}

const Menu = ({ onAction }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="menu">
            <button className="menu-btn" onClick={() => setIsOpen(prev => !prev)}>
                Actions
                {isOpen
                    ? (<i className="fa-solid fa-chevron-up"></i>)
                    : (<i className="fa-solid fa-chevron-down"></i>)
                }
            </button>

            {isOpen && (
                <div className="items border">
                    <button onClick={() => { 
                                            onAction('reset-game') 
                                            setIsOpen(prev => !prev) 
                    }}>Reset Game</button>
                    <button onClick={() => {onAction('reset-all')
                                            setIsOpen(prev => !prev)
                    }}>Reset History</button>
                </div>
            )}
        </div>
    )
}

export default Menu;