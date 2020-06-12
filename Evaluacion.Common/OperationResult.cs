﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Evaluacion.Common
{
    public class OperationResult
    {
        public bool Success { get; set; }

        public string Message { get; set; }
    }

    public class OperationResult<T>
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public T Data { get; set; }
    }
}
