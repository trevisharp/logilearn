namespace LogiLearn.Domain;

public class CircuitFile
{
    public required string Description { get; set; }
    public required string FileName { get; set; }
    public required string JsonData { get; set; }

    public static bool ValidateFiles(string[] files)
        => files.Any(file => file.EndsWith(".llcirc"));
}