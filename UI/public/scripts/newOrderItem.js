var NewOrderItemFooter = React.createClass({
    render: function(){
        return(
            <h1>Footer</h1>
        );
    }
});

var PizzaCreatorNewOrderItemContent = React.createClass({
    render: function() {
        return(
            <h1>Pizza Creator</h1>
        );
    }
});

var NewOrderItemContent = React.createClass({
    render: function() {
        return(
            <div>
                <PizzaCreatorNewOrderItemContent />
            </div>
        );
    }
});

var NewOrderItem = React.createClass({
    render: function() {
        return (
            <div>
                <NewOrderItemContent />
                <NewOrderItemFooter />
            </div>
        );
    }
});

ReactDOM.render(
    <NewOrderItem />,
    document.getElementById('container')
);