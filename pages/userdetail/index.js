import React, { useState, useEffect } from 'react';

export default function Parent() {
    const [showChild, setShowChild] = useState(false);
    // Wait until after client-side hydration to show
    useEffect(() => {
      setShowChild(true);
    }, []);
  
    if (!showChild) {
      // You can show some kind of placeholder UI here
      return (<Empty description="loading..." />);
    }
  
    return <Child/>;
  }
  
  function Child() {
    return (
      <>
  
      </>
    )
  }
  