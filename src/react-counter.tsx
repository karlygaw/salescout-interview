// Implement a Counter component with two buttons:
// “Increase” and “Decrease”, which displays the current counter value.
import React, { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0);

    const increase = () => setCount(count + 1);
    const decrease = () => setCount(count - 1);
    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    );
}

export default Counter