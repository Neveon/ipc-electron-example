# IPC - Inter Process Communication

### The Concept

##### Renderer Process displaying an error message

> showDialog() <--open-error-dialog----
>   [MAIN]                          [Renderer]
>     ----opened-error-dialog---->   LogReply()
>
> The main process calls the native desktop API