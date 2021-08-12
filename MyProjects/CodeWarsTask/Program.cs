using CodeWarsTask;
using NUnit.Framework;
using System;
using System.Linq;

namespace CodeWarsTask
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(Persistence(39));
            Console.WriteLine(FindNextSquare(15241383936));
            Console.WriteLine(Longest("xyaabbbccccdefww", "xxxxyyyyabklmopq"));
        }

        //Take 2 strings s1 and s2 including only letters from ato z.
        //Return a new sorted string, the longest possible, containing distinct
        //letters - each taken only once - coming from s1 or s2.
        public static string Longest(string s1, string s2)
        {
            return string.Join("", s1.ToCharArray().Concat(s2.ToCharArray()).Distinct().OrderBy(c => c));
        }

        //Complete the findNextSquare method that finds the next integral
        //perfect square after the one passed as a parameter.
        //Recall that an integral perfect square is an integer n such that sqrt(n) is also an integer.
        //If the parameter is itself not a perfect square then -1 should be returned.
        //You may assume the parameter is non-negative.
        public static long FindNextSquare(long num)
        {
            double a = Math.Sqrt(num);
            if (num % a != 0)
                return -1;
            return (long)Math.Pow(a + 1.0, 2);
        }

        //Write a function, persistence, that takes in a positive parameter num
        //and returns its multiplicative persistence, which is the number of times
        //you must multiply the digits in num until you reach a single digit.
        public static int Persistence(long n)
        {
            int[] result = n.ToString().Where(char.IsDigit)
                  .Select(x => int.Parse(x.ToString()))
                  .ToArray();

            if(result.Length == 1)
            {
                return 0;
            }

            int iter = 0;
            while (true)
            {
                int res = 1;
                for (int i = 0; i < result.Length; i++)
                {
                    res *= result[i];
                }
                result = res.ToString().Where(char.IsDigit)
                  .Select(x => int.Parse(x.ToString()))
                  .ToArray();
                iter++;
                if (result.Length == 1)
                {
                    return iter;
                }
            }
        }

        //In DNA strings, symbols "A" and "T" are complements of each other,
        //as "C" and "G". You have function with one side of the DNA (string,
        //except for Haskell); you need to get the other complementary side.
        //DNA strand is never empty or there is no DNA at all (again, except for Haskell).
        public static string MakeComplement(string dna)
        {
            var _string = dna.ToCharArray();
            for (int i = 0; i < _string.Length; i++)
            {
                switch (_string[i])
                {
                    case 'T':
                        _string[i] = 'A';
                        break;
                    case 'A':
                        _string[i] = 'T';
                        break;
                    case 'C':
                        _string[i] = 'G';
                        break;
                    case 'G':
                        _string[i] = 'C';
                        break;
                    default:
                        break;
                }
            }
            return new string(_string);
        }

        //Task
        //Given an integral number, determine if it's a square number:
        public static bool IsSquare(int n)
        {
            if (n == 0)
                return true;
            double a = Math.Sqrt(n);
            if(n % a != 0)
                return false;
            return true;
        }
    }
}