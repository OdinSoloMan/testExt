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
            Console.WriteLine(findNb(1071225));
            Console.WriteLine(FindEvenIndex(new int[] { 1, 2, 3, 4, 3, 2, 1 }));
            Console.WriteLine(TowerBuilder(3));
            Console.WriteLine(Encrypt("This is a test!", 4));
            Console.WriteLine(Decrypt("hsi  etTi sats!", 1));
            Console.ReadKey();
        }

        //Implement a pseudo-encryption algorithm which given a string S
        //and an integer N concatenates all the odd-indexed characters of
        //S with all the even-indexed characters of S, this process should be repeated N times.
        //encrypt("012345", 1) => "135024"
        //encrypt("012345", 2) => "135024"->  "304152"
        //encrypt("012345", 3) => "135024"->  "304152"  ->  "012345"
        public static string Encrypt(string text, int n)
        {
            if (text == "" | text == null)
                return null;
            if (n <= 0)
                return text;
            var resStr = text.ToCharArray();
            var step = 0;
            while (n != step)
            {
                var indexDelete = 0;
                for (int i = 0; i < text.Length; i++)
                {
                    var simbol = resStr[indexDelete];
                    resStr = resStr.Where((source, index) => index != indexDelete).ToArray();
                    indexDelete++;
                    resStr = resStr.Concat(new char[] { simbol }).ToArray();
                    i += 1;
                }
                step++;
            }
            return new string(resStr);
        }

        public static string Decrypt(string encryptedText, int n)
        {
            if (n <= 0)
                return encryptedText;
            var resStr = encryptedText.ToCharArray();
            var step = 0;
            while (n != step)
            {
                var indexSpuvn = 0;
                var stepP = 0;
                for (int i = 0; i < encryptedText.Length; i++)
                {
                    var indext = (encryptedText.Length / 2) + stepP;
                    var simbol = resStr[(indext)];
                    resStr = resStr.Where((source, index) => index != indext).ToArray();
                    var newArr = new char [encryptedText.Length];
                    var lp = 0;
                    for (int j = 0; j < newArr.Length; j++)
                    {
                        if (j == indexSpuvn)
                            newArr[j] = simbol;
                        else
                        {
                            newArr[j] = resStr[lp];
                            lp++;
                        }
                    }
                    resStr = newArr;
                    indexSpuvn+=2;
                    i += 1;
                    stepP++;
                }
                step++;
            }
            return new string(resStr);
        }

        //Build Tower by the following given argument:
        //number of floors(integer and always greater than 0).
        //Example
        //[
        //  '  *  ',
        //  ' *** ',
        //  '*****'
        //]
        public static string[] TowerBuilder(int nFloors)
        {
            var s = new string[nFloors];
            var _i = 1;
            for (int i = 0; i < nFloors; i++)
            {
                s[i] = new string(' ', nFloors - i - 1) + new string('*', _i) + new string(' ', nFloors - i - 1);
                _i += 2;
            }
            return s;
        }

        //You are going to be given an array of integers. Your job is to take
        //that array and find an index N where the sum of the integers to the
        //left of N is equal to the sum of the integers to the right of N. If
        //there is no index that would make this happen, return -1.
        public static int FindEvenIndex(int[] arr)
        {
            for (int i = 0; i < arr.Length; i++)
            {
                int left = 0;
                int right = 0;
                for (int j = i; j <= arr.Length - 1; j++)
                {
                    right = right + arr[j];
                }
                for (int k = 0; k <= i; k++)
                {
                    left = left + arr[k];
                }
                if (right == left)
                {
                    return i;
                }
            }
            return -1;
        }

        //The parameter of the function findNb (find_nb, find-nb, findNb, ...)
        //will be an integer m and you have to return the integer n such as n^3 + (n-1)^3 + ... + 1^3 = m
        //if such a n exists or -1 if there is no such n.
        public static long findNb(long m)
        {
            long iter = 0;
            long res = 1;
            long sum = 0;
            while (true)
            {
                sum += (long)Math.Pow(res, 3);
                res++;
                iter++;
                if (sum == m)
                    return iter;
                if (sum > m)
                    return -1;
            }
            // your code
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

            if (result.Length == 1)
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
            if (n % a != 0)
                return false;
            return true;
        }
    }
}