import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export class Functions {

    // Sort an array by the given sortBy
    static sort(array, sortBy){
        const original = array.slice();
        array.sort(this.dynamicSort(sortBy));

        if(this.arraysAreIdentical(original, array, sortBy)){
            array.reverse();
        }
        return array;
    }

    // Sorts the numeric value of each given property
    static dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            return b[property]['#text'] - a[property]['#text'];
        }
    }

    static arraysAreIdentical(arr1, arr2, property){
        if (arr1.length !== arr2.length) return false;
        for (var i = 0, len = arr1.length; i < len; i++){
            if (arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true; 
    }
}