var NewOrderItemSubmission = React.createClass({
    render: function(){
        return(
            <input type="button" className="btn btn-success btn-lg" value="Add to Order" />
        );
    }
});

var NewOrderItemTotal = React.createClass({
    render: function(){
        return(
            <label className="totalLabel">Total: ${this.props.total}</label>
        );
    }
});

var NewOrderItemFooter = React.createClass({
    render: function(){
        return(
            <div className="form-inline">
                <div className="form-group">
                    <NewOrderItemTotal total={this.props.total} />
                </div>
                <div className="form-group inlineLeftMargin">
                    <NewOrderItemSubmission />
                </div>
            </div>
        );
    }
});

var CheckboxOption = React.createClass({
    render: function() {
        return(
            <label className="checkbox-inline">
                <input type="checkbox" value={this.props.value} />{this.props.value}
            </label>
        );
    }
});

var RadioOption = React.createClass({
    handleChange: function() {
        this.props.onSelection(
            this.refs.option.value
        );
    },
    render: function() {
        return(
            <label className="radio-inline">
                <input type="radio" name={this.props.section} value={this.props.value} ref="option" checked={this.props.selected} onChange={this.handleChange} />{this.props.value}
            </label>
        );
    }
});

var PizzaCreatorToppings = React.createClass({
    render: function() {
        var meatOptions = [];
        var veggieOptions = [];
        this.props.toppings.forEach(function(topping){
            if(topping.type === 'meat'){
                meatOptions.push(<CheckboxOption value={topping.value} />)
            }
            else{
                veggieOptions.push(<CheckboxOption value={topping.value} />)
            }
        });
        return(
            <div>
                <h3>Toppings</h3>
                <br/>
                <div className="optionsContainer">
                    <h4>Meats</h4>
                    {meatOptions}
                    <br/><br/>
                    <h4>Veggies</h4>
                    {veggieOptions}
                </div>
            </div>
        );
    }
});

var PizzaCreatorCheese = React.createClass({
    render: function() {
        return(
            <div>
                <h3>Cheese</h3>
                <div className="optionsContainer">
                    <RadioOption section="cheese" value="yes" />
                    <RadioOption section="cheese" value="no" />
                </div>
            </div>
        );
    }
});

var PizzaCreatorSauce = React.createClass({
    render: function() {
        var options = [];
        this.props.sauces.forEach(function(sauce) {
            options.push(<RadioOption section="sauce" value={sauce.value} />);    
        });
        return(
            <div>
                <h3>Sauce</h3>
                <div className="optionsContainer">
                    {options}
                </div>
            </div>
        );
    }
});

var PizzaCreatorCrust = React.createClass({
    render: function() {
        var options = [];
        this.props.crusts.forEach(function(crust) {
            options.push(<RadioOption section="crust" value={crust.value} />);    
        });
        return(
            <div>
                <h3>Crust</h3>
                <div className="optionsContainer">
                    {options}
                </div>
            </div>
        );
    }
});



var PizzaCreatorSize = React.createClass({
    handleChange: function(selection) {
        this.props.onSelection(selection);
    },
    render: function() {
        var options = [];
        var selectedSize = this.props.selectedSize;
        var handleChangeEvent = this.handleChange;
        this.props.sizes.forEach(function(size) {
            var selected = false;
            if(selectedSize == size.value){
                selected = true;
            }
            options.push(<RadioOption section="size" value={size.value} selected={selected} onSelection={handleChangeEvent} />);    
        });
        return(
            <div>
                <h3>Size</h3>
                <div className="optionsContainer">
                    {options}
                </div>
            </div>
        );
    }
});

var PizzaCreatorNewOrderItemContent = React.createClass({
    //TODO: get sizes, crusts, sauces, and toppings from API
    //TODO: post selected data
    //TODO: calculate total based on selections
    getInitialState: function() {
        return {
            selectedSize: '',
            selectedCrust: '',
            selectedSauce: '',
            selectedCheese: '',
            selectedToppings: []
        };
    },
    handleSizeSelection: function(selectedSize) {
        this.setState({
            selectedSize: selectedSize
        });
    },
    handleCrustSelection: function(selectedCrust) {
        this.setState({
            selectedCrust: selectedCrust
        });
    },
    handleSauceSelection: function(selectedSauce) {
        this.setState({
            selectedSauce: selectedSauce
        });
    },
    handleCheeseSelection: function(selectedCheese) {
        this.setState({
            selectedCheese: selectedCheese
        });
    },
    handleToppingSelection: function(selectedToppings) {
        this.setState({
            selectedToppings: selectedToppings
        });
    },
    render: function() {
        return(
            <div>
                <h1 className="text-center">Pizza Creator</h1>
                <PizzaCreatorSize sizes={SIZES} selectedSize={this.state.selectedSize} onSelection={this.handleSizeSelection} /><hr/>
                <PizzaCreatorCrust crusts={CRUSTS} selectedCrust={this.state.selectedCrust} onSelection={this.handleCrustSelection} /><hr/>
                <PizzaCreatorSauce sauces={SAUCES} selectedSauce={this.state.selectedSauce} onSelection={this.handleSauceSelection} /><hr/>
                <PizzaCreatorCheese selectedCheese={this.state.selectedCheese} onSelection={this.handleCheeseSelection} /><hr/>
                <PizzaCreatorToppings toppings={TOPPINGS} selectedToppings={this.state.selectedToppings} onSelection={this.handleToppingSelection} /><br/><hr/>
                <NewOrderItemFooter total="00.00"/>
            </div>
        );
    }
});

var SIZES = [
    {value: 'small'},
    {value: 'medium'},
    {value: 'large'},
    {value: 'extra large'}
]

var CRUSTS = [
    {value: 'hand-tossed'},
    {value: 'deep dish'},
    {value: 'thin'}
]

var SAUCES = [
    {value: 'marinara'},
    {value: 'bbq'},
    {value: 'ranch'},
    {value: 'buffalo'}
]

var TOPPINGS = [
    {type: 'meat', value: 'pepperoni'},
    {type: 'meat', value: 'sausage'},
    {type: 'meat', value: 'bacon'},
    {type: 'meat', value: 'canadian bacon'},
    {type: 'meat', value: 'hamburger'},
    {type: 'meat', value: 'steak'},
    {type: 'veggie', value: 'peppers'},
    {type: 'veggie', value: 'onions'},
    {type: 'veggie', value: 'olives'},
    {type: 'veggie', value: 'spinach'},
    {type: 'veggie', value: 'mushrooms'},
    {type: 'veggie', value: 'garlic'}
]

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
            </div>
        );
    }
});

ReactDOM.render(
    <NewOrderItem />,
    document.getElementById('container')
);