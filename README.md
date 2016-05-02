# script-executor
Utility for managing instances of user generated code. It allows to:
- Merge some common properties and a "world" API (deep-copied to avoid malicious redefining) into instances of user generated code.
- Wire a set of events on an `EventEmitter` to handlers in instances.
