function skillsMember() {
    return {
        name: 'Member',
        age: 26,
        skills: ['HTML', 'CSS', 'JS'],
        details: function() {
            return `Name: ${this.name}, Age: ${this.age}, Skills: ${this.skills.join(', ')}`;
        }
    }
}