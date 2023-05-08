import { useState } from 'react'
import './Menu.css'

type Props = {
    onAction(action: 'reset' | 'new-round') : void
}

const Menu = ({ onAction }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="menu" data-id="menu">
            <button className="menu-btn" onClick={() => setIsOpen(prev => !prev)}>
                Actions
                {isOpen
                    ? (<i className="fa-solid fa-chevron-up"></i>)
                    : (<i className="fa-solid fa-chevron-down"></i>)
                }
            </button>

            {isOpen && (
                <div className="items border" data-id="menu-items">
                    <button onClick={() => { 
                                            onAction('reset') 
                                            setIsOpen(prev => !prev) 
                    }}>Reset</button>
                    <button onClick={() => {onAction('new-round')
                                            setIsOpen(prev => !prev)
                    }}>New Round</button>
                </div>
            )}
        </div>
    )
}

export default Menu;