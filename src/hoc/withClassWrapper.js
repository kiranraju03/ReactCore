import React from 'react';

const withClassWrapper = (WrappingComponent, className) => {
    return props => (
        <div className={className}>
            {/* Forwarding the props recieved to the wrapped child */}
            <WrappingComponent {...props} />
        </div>
    );
};

export default withClassWrapper;