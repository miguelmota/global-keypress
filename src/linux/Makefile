CC := gcc
CFLAGS := -g -Wall
BIN_NAME := globalkeypress
OBJS := globalkeypress.o key_util.o 

all: $(BIN_NAME)

$(BIN_NAME): $(OBJS)
	gcc $(CFLAGS) $(OBJS) -o $(BIN_NAME)

clean:
	rm -f *.o $(BIN_NAME)
