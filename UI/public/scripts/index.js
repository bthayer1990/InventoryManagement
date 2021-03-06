var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;

var NewOrderItemFooter = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onSubmit();
    },
    render: function(){
        return(
            <div className="form-inline">
                <div className="form-group">
                    <label className="totalLabel">Total: ${this.props.total}</label>
                </div>
                <button className="inlineLeftMargin btn btn-success btn-lg" onClick={this.handleSubmit} >Add to Order</button>
            </div>
        );
    }
});

var CheckboxOption = React.createClass({
    handleChange: function() {
        this.props.onSelection(
            this.refs.option.value,
            this.refs.option.checked
        );
    },
    render: function() {
        return(
            <label className="checkbox-inline">
                <input type="checkbox" value={this.props.value} ref="option" checked={this.props.selected} onChange={this.handleChange} />{this.props.value}
            </label>
        );
    }
});

var CheckBoxOptionHeader = React.createClass({
    render: function() {
        return(
            <div>
                <br/>
                <h4>{this.props.text}</h4>
            </div>
        );
    }
});

var PizzaCreatorCheckboxSection = React.createClass({
    handleChange: function(selection, checked) {
        this.props.onSelection(selection, checked);
    },
    render: function() {
        var checkboxOptionComponents = [];
        var selectedOptions = this.props.selectedOptions;
        var handleChangeEvent = this.handleChange;
        var lastType = null;
        this.props.options.forEach(function(option) {
            if (option.type !== lastType) {
                checkboxOptionComponents.push(<CheckBoxOptionHeader text={option.type} />);
            }
            var selected = false;
            if(selectedOptions.filter(function(item){return (item.value == option.value);}).length > 0){
                selected = true;
            }
            checkboxOptionComponents.push(<CheckboxOption value={option.value} selected={selected} onSelection={handleChangeEvent} />);
            lastType = option.type;
        }.bind(this));
        return(
            <div>
                <h3>{this.props.section}</h3>
                <div className="optionsContainer">
                    {checkboxOptionComponents}
                </div>
            </div>
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

var PizzaCreatorRadioButtonSection = React.createClass({
    handleChange: function(selection) {
        this.props.onSelection(selection);
    },
    render: function() {
        var radioOptionComponents = [];
        var section = this.props.section;
        var selectedOption = this.props.selectedOption;
        var handleChangeEvent = this.handleChange;
        this.props.options.forEach(function(option) {
            var selected = false;
            if(selectedOption.value == option.value){
                selected = true;
            }
            radioOptionComponents.push(<RadioOption section={section} value={option.value} selected={selected} onSelection={handleChangeEvent} />);    
        });
        return(
            <div>
                <h3>{this.props.section}</h3>
                <div className="optionsContainer">
                    {radioOptionComponents}
                </div>
            </div>
        );
    }
});

var PizzaCreatorNewOrderItemContent = React.createClass({
    loadSizesFromServer: function() {
        $.ajax({
            url: 'enter url here',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({sizes: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('enter url here', status, err.toString());
            }.bind(this)
        });
    },
    loadCrustsFromServer: function() {
        $.ajax({
            url: 'enter url here',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({crusts: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('enter url here', status, err.toString());
            }.bind(this)
        });
    },
    loadSaucesFromServer: function() {
        $.ajax({
            url: 'enter url here',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({sauces: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('enter url here', status, err.toString());
            }.bind(this)
        });
    },
    loadCheesesFromServer: function() {
        $.ajax({
            url: 'enter url here',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({cheeses: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('enter url here', status, err.toString());
            }.bind(this)
        });
    },
    loadToppingsFromServer: function() {
        $.ajax({
            url: 'enter url here',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({toppings: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('enter url here', status, err.toString());
            }.bind(this)
        });
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleSubmit: function() {
        var path = '/';
        this.context.router.push(path);
        //var pizza = {};//TODO: determine structure of data to send; use the state data
        // $.ajax({
        //     url: 'enter url here',
        //     dataType: 'json',
        //     type: 'POST',
        //     data: pizza, 
        //     success: function(data) {
        //         var path = '/';
        //         this.context.router.push(path);
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error('enter url here', status, err.toString());
        //     }.bind(this)
        // });
    },
    //TODO: post selected data
    getInitialState: function() {
        return {
            // sizes: [],
            // crusts: [],
            // sauces: [],
            // cheeses: [],
            // toppings: [],
            selectedSize: {},
            selectedCrust: {},
            selectedSauce: {},
            selectedCheese: {},
            selectedToppings: [],
            total: 0
        };
    },
    componentDidMount: function() {
        // this.loadSizesFromServer();
        // this.loadCrustsFromServer();
        // this.loadSaucesFromServer();
        // this.loadCheesesFromServer();
        // this.loadToppingsFromServer();
    },
    handleSizeSelection: function(selectedSizeValue) {
        var selectedSizes = SIZES.filter(function(item){return (item.value == selectedSizeValue);});
        this.setState({
            selectedSize: selectedSizes[0]
        });
    },
    handleCrustSelection: function(selectedCrustValue) {
        var selectedCrusts = CRUSTS.filter(function(item){return (item.value == selectedCrustValue);});
        this.setState({
            selectedCrust: selectedCrusts[0]
        });
    },
    handleSauceSelection: function(selectedSauceValue) {
        var selectedSauces = SAUCES.filter(function(item){return (item.value == selectedSauceValue);});
        this.setState({
            selectedSauce: selectedSauces[0]
        });
    },
    handleCheeseSelection: function(selectedCheeseValue) {
        var selectedCheeses = CHEESES.filter(function(item){return (item.value == selectedCheeseValue);});
        this.setState({
            selectedCheese: selectedCheeses[0]
        });
    },
    handleToppingSelection: function(selectedToppingValue, checked) {
        var stateSelectedToppings = this.state.selectedToppings;
        if (checked) {
            var selectedToppings = TOPPINGS.filter(function(item){return (item.value == selectedToppingValue);});
            stateSelectedToppings.push(selectedToppings[0]);
        }
        else {
            for(var i = 0; i < stateSelectedToppings.length; i++){
                if(stateSelectedToppings[i].value == selectedToppingValue){
                    stateSelectedToppings.splice(i, 1);
                }
            }
        }
        this.setState({
            selectedToppings: stateSelectedToppings
        });
    },
    calculateTotal: function() {
        var total = 0;
        if(this.state.selectedSize.price){
            total += this.state.selectedSize.price;
        }
        return total;
    },
    render: function() {
        var total = this.calculateTotal();
        return(
            <div>
                <h1 className="text-center">Create Your Own Pizza</h1>
                <PizzaCreatorRadioButtonSection section="Size" options={SIZES} selectedOption={this.state.selectedSize} onSelection={this.handleSizeSelection} /><hr/>
                <PizzaCreatorRadioButtonSection section="Crust" options={CRUSTS} selectedOption={this.state.selectedCrust} onSelection={this.handleCrustSelection} /><hr/>
                <PizzaCreatorRadioButtonSection section="Sauce" options={SAUCES} selectedOption={this.state.selectedSauce} onSelection={this.handleSauceSelection} /><hr/>
                <PizzaCreatorRadioButtonSection section="Cheese" options={CHEESES} selectedOption={this.state.selectedCheese} onSelection={this.handleCheeseSelection} /><hr/>
                <PizzaCreatorCheckboxSection section="Toppings" options={TOPPINGS} selectedOptions={this.state.selectedToppings} onSelection={this.handleToppingSelection} /><br/><hr/>
                <NewOrderItemFooter total={total} onSubmit={this.handleSubmit} />
            </div>
        );
    }
});

var SIZES = [
    {value: 'small', price: 5.00},
    {value: 'medium', price: 10.00},
    {value: 'large', price: 15.00},
    {value: 'extra large', price: 20.00}
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

var CHEESES = [
    {value: 'yes'},
    {value: 'no'}
]

var TOPPINGS = [
    {type: 'Meat', value: 'pepperoni'},
    {type: 'Meat', value: 'sausage'},
    {type: 'Meat', value: 'bacon'},
    {type: 'Meat', value: 'canadian bacon'},
    {type: 'Meat', value: 'hamburger'},
    {type: 'Meat', value: 'steak'},
    {type: 'Veggie', value: 'peppers'},
    {type: 'Veggie', value: 'onions'},
    {type: 'Veggie', value: 'olives'},
    {type: 'Veggie', value: 'spinach'},
    {type: 'Veggie', value: 'mushrooms'},
    {type: 'Veggie', value: 'garlic'}
]

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Home Page</h1>
                <ul role="nav">
                    <li><Link to="/createPizza">Create Your Own Pizza</Link></li>
                </ul>
            </div>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div>
                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand">App Name</Link>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pizza<span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/createPizza">Create Your Own Pizza</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
});

ReactDOM.render((
  <div>
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/createPizza" component={PizzaCreatorNewOrderItemContent}/>
        </Route>
    </Router>
  </div>
), document.getElementById('container'))
