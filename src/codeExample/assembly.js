const code =
  'section .data\n    msg db "Hello World!", 0ah\n\nsection .text\n    global _start\n_start:\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, 13\n    syscall\n    mov rax, 60\n    mov rdi, 0\n    syscall';
export default code;
