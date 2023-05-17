# Challenge questions and answers

## What is the difference between Component and PureComponent? Give an example where it might break my app.

Both PureComponent and Component are going to re-render when we pass a state or prop, but the component will render itself even if some of the state or props are the same.

The PureComponent will render only if detects a difference between the state and props. This is useful to increase performance.

The issue with PureComponent is that it performs a shallow equality to check on the current props and next props, as well as current states and next state. If the state or props are complex data structures, it may produce false answers.

Here we can see an example where it might break our app:

```
import React, { PureComponent, Component } from "react";

class Person extends PureComponent {
  render() {
    const { data } = this.props;
    return <h2>{data.name}</h2>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { name: "Mark" },
    };
  }

  changeData = () => {
    const { data } = this.state;
    data.name = "Simon";
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Person data={data} />
        <button onClick={this.changeData}>Change data</button>
      </div>
    );
  }
}
```

In this case, when we click on changedate button, the changedata function directly mutates current state, and this mutation bypasses the shallow comparison that the PureComponent does, because it is comparing references and not the content of the object.

## Context + ShouldComponentUpdate might be dangerous. Why is that?

Context and ShouldComponentUpdate is dangerous because, when we use ShouldComponentUpdate we are conditionally re-rendering a part of the app, and this might block context propagation. So at the end, states that must be updated with context won't be updated.

## Describe 3 ways to pass information from a component to its PARENT.

Here are three ways to pass information from a component to its parent:

- First way, with a callback function. We can pass a function, that is defined in the parent, as a prop to the child. By calling the function in the child with parameters, we can work with these parameters in the parent.

```
import { useState } from "react";

const Parent = () => {
  const [greeting, setGreeting] = useState("Hello world");
  const changeGreeting = (greeting) => {
    setGreeting(greeting);
  };

  return (
    <>
      {greeting}
      <Child changeGreeting={changeGreeting} />
    </>
  );
};

const Child = ({ changeGreeting }) => {
  return (
    <button onClick={() => changeGreeting("Bye world")}>Change greeting</button>
  );
};
```

- Second way to pass information, is using useRef hook. Instead of passing a function, we pass a reference from the parent to the child, that will be changed from the child and will be updated in the parent. Updating the reference won't trigger any event.

```
import { useRef } from "react";

const Parent = () => {
  const ref = useRef("");
  const changeGreeting = (greeting) => {
    setGreeting(greeting);
  };

  return (
    <>
      {ref.current}
      <Child ref={ref} />
    </>
  );
};

const Child = ({ ref }) => {
  const changeRef = (event) => {
    return (ref.current = event.target.value);
  };

  return <input onChange={(event) => changeRef(event)}>Change greeting</input>;
};
```

- Finally, we have the possibility to define a global state management like Context or Redux. This way, we can save values in our global state from the child and call them from the parent. Be aware that both parent and child must be defined inside the global state management provider.

## Give 2 ways to prevent components from re-rendering.

To prevent re-rendering, here we have two ways:

- First, we can choose to use useCallback or useMemo, two similar hooks but different at the same time.

useCallback is a hook that memorizes a function so that prevent re-rendering if the function doesn't change.

useMemo is a hook that memorizes a value so that prevent re-rendering is the value doesn't change.

Here we can see the functionality of both hooks.

```
import { useCallback, useMemo } from "react";

const SumComponent = ({ a, b }) => {
  const sum = useMemo(() => addNumbers(a + b), [a, b]);
  const alertSum = useCallback(() => alert(sum), [a, b]);

  return (
    <>
      <span>{sum}</span>
      <button onClick={alertSum}>Alert sum</button>
    </>
  );
};
```

- Next, we can use useRef because can change without causing re-rendering.

```
import { useRef } from "react";

const RefComponent = () => {
  const ref = useRef("");
  const changeRef = (event) => {
    return (ref.current = event.target.value);
  };

  return (
    <>
      {ref.current}
      <input onChange={(event) => changeRef(event)} />
    </>
  );
};
```

This way, the value of the input will be stored in the ref variable and the component won't re-render.

## What is a fragment and why do we need it? Give an example where it might break my app.

Fragments wraps elements if we need a single element. When we need to return the element of a component, we need a single element, otherwise the app will break.

This will work:

```
import Fragment from "react";

const FragmentComponent = () => {
  return (
    <Fragment>
      <h1>Hello World</h1>
      <h1>Bye World</h1>
    </Fragment>
  );
};
```

This will break our app:

```
const Component = () => {

  return (
    <h1>Hello World</h1>
    <h1>Bye World</h1>
  )
}
```

Also, we can use <></> if we want to simplify the use of fragment.

## Give 3 examples of the HOC pattern.

We are going to see below three examples of the HOC pattern:

- Giving styles:

```
import React from "react";

const higherOrderComponent = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <div syle={{ background: "blue", display: flex, placeItems: center }}>
          <Component />
        </div>
      );
    }
  };
};

const Component = () => {
  return <h1>Hello World</h1>;
};

export default higherOrderComponent(Component);
```

- Giving functionality:

```
import React, { useEffect } from "react";

const higherOrderComponent = (Component) => {
  const WrappedComponent = () => {
    useEffect(() => {
      alert("Hello world!");
      console.log("Hello world!");
    }, []);
    return <Component />;
  };
};

const Component = () => {
  return <h1>Hello World</h1>;
};

export default higherOrderComponent(Component);
```

- Giving state and props:

```
import React, { useState } from "react";

const higherOrderComponent = (Component) => {
  const WrappedComponent = () => {
    const [state, setState] = useState("Hello world");
    return <Component state={state} />;
  };
};

const Component = ({ state }) => {
  return <h1>{state}</h1>;
};

export default higherOrderComponent(Component);
```

## What's the difference in handling exceptions in promises, callbacks and async...await?

To handle exceptions, promises use catch method, callback functions use throw new Error method and async...await try catch method.

- Promises:

```
const newPromise = Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello world!");
  }, 1000);
});

myPromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.err(err);
  });
```

- Callbacks:

```
const handleCallback = (value, callback) => {
  if (!value) {
    throw new Error("Value must be defined");
  }
  callback(value);
};

const callback = (value) => {
  alert(value);
};
```

- Asycn...await

```
const newPromise = Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello world!");
  }, 1000);
});

const asyncAwait = async () => {
  try {
    await newPromise();
  } catch (err) {
    console.err(err);
  }
};
```

## How many arguments does setState take and why is it async.

The setState method takes two arguments. The first argument is the state as returned by the app constructor. The second argument is the callback function that is called when the state is updated.

```
this.setState({ data: "Hello world" }, () => {
  console.log("State updated!");
});
```

And setState is async to ensure that the app state is updated.

## List the steps needed to migrate a Class to Function Component.

To migrate a Class to Function Component, we need to follow these steps:

- Set our class component declaration to a function declaration
- Convert state variables in useState hooks
- Convert lifecycle methods to useEffect hooks
- Replace this references
- Delete render method
- Render JSX
- Test and refactor

## List a few ways styles can be used with components.

Here are several ways to style components:

- Inline styling: apply inline styles directly to JSX elements using style attribute.
- CSS stylesheets: create separate CSS files and import them into React files.
- CSS modules: enables local scoping of CSS class names, importing stylesheets as objects and accessing them as properties.
- Styled-components: write actual CSS in our JS files, template literal to style components.

## How to render an HTML string coming from the server.

To render an HTML string from the server, we need to use the dangerouslySetInnerHTML attribute. This attribute allows us to set the innerHTML as HTML from a string.

```
const Component = () => {
  const htmlString = `<h1>Hello World!</h1>`;
  return <div dangerouslySetInnerHTML={htmlString} />;
};
```
