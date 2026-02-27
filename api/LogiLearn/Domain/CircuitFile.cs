namespace LogiLearn.Domain;

public class CircuitFile
{
    public required string Description { get; set; }
    public required string FileName { get; set; }
    public required string JsonData { get; set; }

    public static bool ValidateFiles(string[] files)
        => files.Any(ValidateFile);

    public static bool ValidateFile(string file)
        => file.EndsWith(".llcirc");
    
    public static string GetNewName() => "circ.llcirc";

    public static string GetNewContent() =>
        """
        {
            "gates": [ 
                { "id": "in", "x": 100, "y": 100, "type": "input" }, 
                { "id": "out", "x": 200, "y": 100, "type": "output" }
            ],
            "wires": [ { "fromId": "in", "toId": "out"} ]
        }
        """;
}