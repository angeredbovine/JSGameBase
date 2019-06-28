function MathHelpers()
{

}

MathHelpers.PositiveMod = function(dividend, divisor)
{

        return (((dividend % divisor) + divisor) % divisor);

}
