<template>
  <div class="wrapper">
    <h1>TodoList</h1>
    <nav>
      <router-link to="/">HomePage</router-link>
    </nav>
    <router-view></router-view>
    <div class="todoList">
      <fieldset>
        <legend>Мои задачи</legend>
        <div
        class="todos"
        v-for="todo in todos" :key="todo">
          <div class="leftList">
            <div
              class="datesDeadline"
              :class="{ checked: todo.state === true }">
              {{ todo.deadline }}
            </div>
            <input
              :checked="todo.state === true"
              @change="todo.state === true ? todo.state = false : todo.state = true"
              type="checkbox" value="todo" />
            <label
              class="labelTodo"
              :class="{ checked: todo.state === true }"
              for="todo">
            {{ todo.name }}
            </label>
          </div>
          <img
            src="../assets/trash.png" height="18px" class="removeTodo"
            @click="removeTodo(todo)">
        </div>
      </fieldset>
    <div
      v-if="validationForm===false"
      class="validation">
    Ошибка валидации</div>
      <div class="wrapperInputs">
        <input
          v-model="inputTodo"
          @keyup.enter="addTodo"
          type="text"
          placeholder="Посадить дерево"
          class="inputText"/>
        <label for="date">Дедлайн
        </label>
        <input
          v-model="inputDate"
          @keyup.enter="addTodo"
          oninput="validity.valid||(value='')"
          value="date"
          type="number"
          placeholder="3 дня"
          class="inputDate" />
      </div>
      <button
        @click="addTodo">
      Create todo</button>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      todos: [],
      inputTodo: '',
      inputDate: '',
      validationForm: true
    }
  },
  
  created() {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      this.todos = JSON.parse(saveTodos);
    }
  },
  methods: {

    addTodo() {

      if(this.validation(this.inputTodo)===false) {
        return
      }

      const objTodo = this.createObj(this.inputTodo, this.calculateNormalizeDate, this.forSortDate);

      this.todos.push(objTodo);

      this.todosSort(this.todos);
    },

    validation(input) {
      if (
        input === '' ||
        this.todos.find(el => el.name === input)) {
          this.validationForm = false;
          return false
      }
    },

    createObj(name, deadLine, sortDate) {
      const objTodo = {
        name: '',
        deadline: '',
        state: false,
        sortDate: 0
      };
      objTodo.name = name;
      objTodo.deadline = deadLine;
      objTodo.sortDate = sortDate;
      return objTodo
    },

    todosSort(todos) {
      todos.sort(function (a, b) {
        if (a.sortDate > b.sortDate) {
          return 1;
        }
        if (a.sortDate < b.sortDate) {
          return -1;
        }
        return 0;
      });
    },

    removeTodo(todo) {
      this.todos = this.todos.filter(item => item !== todo);
    }
  },

  computed: {

    calculateDate() {
      const calcDate = new Date();
      calcDate.setDate(calcDate.getDate() + this.inputDate);
      return calcDate
    },

    calculateNormalizeDate() {
      let month = this.calculateDate.getMonth() + 1;
      let day = this.calculateDate.getDate();
      month = month < 10 ? '0' + month : month;
      return `${day}.${month}`
    },

    forSortDate() {
      return this.calculateDate.getTime();
    },
  },

  watch: {

    todos: {
      handler() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.inputTodo = '';
        this.inputDate = '';
      },
      deep: true
    },

    inputTodo() {
      this.validationForm = true;
    }
  }
}
</script>

<style></style>