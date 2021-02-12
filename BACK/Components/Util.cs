using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Components
{
    public static class Util
    {
        public static string GerarHash(string senha)
        {
            if (string.IsNullOrWhiteSpace(senha) || string.IsNullOrEmpty(senha))
                return null;

            HashAlgorithm _algoritmo = MD5.Create();

            var valorCodificado = Encoding.UTF8.GetBytes(senha);
            var senhaCifrada = _algoritmo.ComputeHash(valorCodificado);
            var sb = new StringBuilder();

            foreach (var caractere in senhaCifrada)
                sb.Append(caractere.ToString("X2"));

            return sb.ToString();
        }

    }
}
