function getHashTags(headline){
    //number of hashtags to generate.
    let n = 3;
    let wordList;
    let hashTags = [];
    //remove any non-alpha or space charater
    const regex = /[^\w\s]|_/ig;
    headline = headline.replaceAll(regex,'').toLowerCase();
    wordList = headline.split(" ");
    if(wordList.length > n){
        //init hashTags with words to compare against
        for(let i=0; i<n; i++){
            hashTags.push(wordList[i]);
        }
        hashTags.sort(compare);
        wordList.splice(0,n);
        for(let word of wordList){
            if(word.length > hashTags[n-1].length){
                for(let i=0; i<n; i++){
                    //compares against all stored hashtags, starting with the largest.
                    //first word that target word is larger than is where it gets stored.
                    //then, smallest word is removed from the list.
                    if(word.length > hashTags[i].length){
                        hashTags.splice(i,0,word);
                        hashTags.splice((n),1);
                        break;
                    }
                }
            }
        }
    }
    //words in list less than or equal to number of hashtags to generate.
    else { hashTags = wordList; }
    hashTags = hashTags.map(x => '#' + x);
    return hashTags;
}
// compares words by length, sorting largest to smallest
function compare(firstEl, secondEl){
    return secondEl.length - firstEl.length;
}