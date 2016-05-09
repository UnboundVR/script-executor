# script-executor
Utility for creating and managing instances of user generated code. It allows to:
- Create classes from user code using a queue to ensure that's made sequentially (to avoid issues with jspm CDN).
- Merge some common properties and a "world" API (deep-copied to avoid malicious redefining) into instances of user generated code.
- Wire a set of events on an `EventEmitter` to handlers in instances.
