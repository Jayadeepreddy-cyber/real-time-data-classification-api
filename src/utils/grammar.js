//Grammar is defined to check whether the expression is in user defined format
const ohm = require('ohm-js');
const myGrammar = ohm.grammar(String.raw`
    MyGrammar {
      rulename = expr
      expr= simple " in " text | complex " is " finalparse
      simple= basic " is " comoperator number
      basic = " count of " attribute
      complex = aggregator "of"  combined " and" combined
      combined = basic | complex
      aggregator = " maximum " | " minimum " | " sum "
      comoperator = "equalto " | "notequalto " | "greaterthan " | "greaterthanequalto " | "lessthan " | "lessthanequalto "
      text = alnum+ (" " text)*
      attribute = letter+ | number
      number = digit+
      finalparse = comoperator number " in " text
    }
  `);
  //sample input
  //const input = ' minimum of maximum of count of a and count of b and maximum of count of c and count of d is greaterthan 4 in sdhbanhsd';

module.exports=function(input)
{
    const match = myGrammar.match(input);
    return match.succeeded();
  }



