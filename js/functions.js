/** FUNCTIONS **/


// Given the crib and the ciphertext, it fills out the plaintext array
function create_plaintext(ciphertext, crib) {
    var plaintext = [];

    for (let i = 0; i < ciphertext.length; i++) {
        if (i < crib.length) {
            plaintext[i] = crib[i];
        }
        else {
            plaintext[i] = "";
        }
    }
    return plaintext;
}


// Creating the initial key array. Always returns an empty array.
function create_key(ciphertext) {
    var key = [];

    for (let i = 0; i < ciphertext.length; i++) {
        key[i] = "";
    }
    return key;
}


// Shifting the array right. 
// Non-letter elements will wrap around, but will not wrap any letters around
function shift_array_right(array) {

    var length = array.length;

    // If the last element of the array contains a letter, then do not shift right
    if (array[length - 1] != '') {
        console.log("Cannot shift further right");
        return array;
    }

    // Shifting the array right
    array.unshift(array.pop());
    return array;
}

// Shifting the array left. 
// Non-letter elements will wrap around, but will not wrap any letters around
function shift_array_left(array) {

    // If the first element of the array contains a letter, then do not shift left
    if (array[0] != '') {
        console.log("Cannot shift further left");
        return array;
    }

    // Shifting the array right
    array.push(array.shift());
    return array;
}


// Updates the key based on the current plaintext and ciphertext values
function fill_key(plaintext, ciphertext, key) {
    
    // Changing the plaintext to all lowercase to be passed into the get_key_letter method.
    plaintext_replacement = to_uppercase(plaintext);

    for (let i = 0; i < ciphertext.length; i++) {
        current_ciphertext_letter = ciphertext[i];
        current_plaintext_letter = plaintext_replacement[i];

        // If there is a plaintext letter at the current index, we will find the corresponding key letter.
        if (current_plaintext_letter != undefined) {
            letter = get_key_letter(current_plaintext_letter, current_ciphertext_letter, table);
            key[i] = letter;
        }

        // Otherwise, if there is no letter in the plaintext, there is no letter in the key.
        else {
            key[i] = "";
        }
    }
    
    // Returning the key array
    return key;
}


// Creates and returns the addition table, given the alphabet (array)
function generate_addition_table(alphabet) {

    // Creating a 26x26 matrix
    var addition_table = create_array(alphabet.length, alphabet.length);

    for (let i = 0; i < alphabet.length; i++) {
    
        // filling out each row
        for (let j = 0; j < alphabet.length; j++) {
            addition_table[i][j] = alphabet[j];
        }

        // Shifting the alphabet by one index
        alphabet.push(alphabet.shift());
    }

    return addition_table;
}


// Function that returns a multidimensional array.
// create_array(2, 2) returns a 2x2 matrix.
function create_array(length) {
    var arr = new Array(length);
    var i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = create_array.apply(this, args);
    }

    return arr;
}


// Converts a numerical index of the addition table to it's corresponding letter. (assuming 0 is the starting index)
function num_to_letter(num) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return alphabet[num];
}

// Converts a letter to the corresponding numerical index of the table. (assuming 0 is the starting index)
function letter_to_num(letter) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    for (let i = 0; i < alphabet.length; i++) {
        if (letter = alphabet[i]) {
            return i;
        }
    }
}


// Given the plaintext and ciphertext letters, along with the addition table, returns the corresponding key letter to the plaintext letter.
function get_key_letter(plaintext_letter, ciphertext_letter, table) {

    for (let row = 0; row < table.length; row++) {

        // Finding the correct row
        var row_letter = num_to_letter(row);
        if (row_letter == plaintext_letter) {
            
            // Iterating through every ciphertext letter in the row
            for (let col = 0; col < table[row].length; col++) {

                // The current ciphertext letter
                var col_letter = table[row][col];

                // When we find the matching ciphertext letter, we will return it's index, but as a letter.                
                if (col_letter == ciphertext_letter) {
                    key_letter = num_to_letter(col);
                    key_letter = to_lowercase(key_letter);

                    return key_letter;
                }
            }
        }
    }
}


// Changes each letter in an array to uppercase
function to_uppercase(arr) {
    var new_arr = []
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            new_arr[i] = arr[i].toUpperCase();
        }
    }

    return new_arr;
}

// Changes each letter in an array to lowercase
function to_lowercase(arr) {
    var new_arr = []
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            new_arr[i] = arr[i].toLowerCase();
        }
    }

    return new_arr;
}

// Todo: Should these variables be global?
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
table = generate_addition_table(alphabet, alphabet);













