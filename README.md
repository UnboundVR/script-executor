# script-executor
Utility to allow execution of user-provided code.

## Usage
This utility is comprised of three classes (each of them `import`able):
- **Prototypes**: Allows to create objects by passing some code as a string that augments their properties.
- **Instances**: Allows to define objects with arbitrary properties that 'inherit' from a prototype.
- **Events**: Wires events from an event emitter to handlers defined on an instance/prototype.

For convenience, the default export of this module contains an `instances` and `prototypes` properties, which contain a singleton instance of the corresponding objects.

### Creating a prototype
To create a prototype, just do:

```
import executor from 'script-executor';

let id = 'some-prototype-id';
let code = 'function() {this.sayHello = function(name){console.log('Hello ' + name + '!');};}';
let options = {
  data: {}, // this gets deep-copied into the prototype object
  world: {} // this is the API that all methods in the prototype should use to interact with outside
};

executor.prototypes.set(id, code, options);
```

*Note: the world object will be the ONLY way of interacting with outside with sandboxed prototypes, which will be soon an option when constructing prototypes.*

### Creating an instance
To create an instance, you have to:

```
import executor from 'script-executor';

let id = 'some-instance-id';
let proto = prototypes.get('some-prototype-id');
let data = {}; // this gets deep-copied into the instance object

executor.instances.set(id, proto, data);
```

### Calling methods on instances (and prototypes)
It's possible to call a method on an instance by doing:

```
instances.call('some-instance-id', 'sayHello', 'World');
```

It's also possible to directly call a method on a prototype, by doing:
```
prototypes.call('some-prototype-id', 'sayHello', 'World');
```

### Common methods for prototypes and instances
Both instances and prototypes expose the following (self-explanatory) methods:

- `get(id)`

- `remove(id)`

- `hasMethod(id, method)`

- `getAllIds()`

## Wiring events
It's possible to wire certain events on an `EventEmitter` to handlers in instances (or prototypes).

To do so, it's necessary to create an instance of `Events` passing either an instance of `prototypes` or of `instances`, and then wire the events:

```
import {Events} from 'script-executor';
import executor from 'script-executor';

let emitter = ...; // some event emitter

let events = new Events(executor.instances);
events.wire(emitter, ['SomeEvent', 'SomeOtherEvent']);
```

This way, whenever a `SomeEvent` or `SomeOtherEvent` is fired on that `EventEmitter`, all instances which have an `onSomeEvent` or `onSomeOtherEvent` method will have that method called.

For convenience, there is a `wireEvents` method available in the default export, created for the default `instances` property, which can be used like this:

```
import executor from 'script-executor';

let emitter = ...; // some event emitter

executor.wireEvents(emitter, ['SomeEvent', 'SomeOtherEvent']);
```
