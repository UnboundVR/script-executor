# script-executor
Utility to allow execution of user-provided code

## Usage
This utility is comprised by three key classes (each of them `import`able):
- **Prototypes**: Allows to create objects that contain a certain code.
- **Instances**: Allows to define objects with arbitrary properties that 'inherit' from a prototype.
- **Events**: Wires events from an event emitter to handlers defined on an instance/prototype.

For convenience, the default export of this module contains singleton `instances` and `prototypes` instances.

### Creating a prototype
To create a prototype, just do:

```
let id = 'some-prototype-id';
let code = 'function() {this.sayHello = function(name){console.log('Hello ' + name + '!');};}';
let options = {
  data: {}, // this gets deep-copied into the prototype object
  world: {} // this is the API that all functions within the prototype should use to interact with outside
};

prototypes.set(id, code, options);
```

*Note: the world object will be the ONLY way of interacting with outside with sandboxed prototypes, which will be soon an option when constructing prototypes.*


### Creating an instance
To create an instance, you have to:

```
let id = 'some-instance-id';
let proto = prototypes.get('some-prototype-id');
let data = {}; // this gets deep-copied into the instance object

instances.set(id, proto, data);
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

- `get(id)``

- `remove(id)``

- `hasMethod(id, method)``

- `getAllIds()``
