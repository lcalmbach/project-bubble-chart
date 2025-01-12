# Bubble Chart Project

This project showcases an interactive clustered bubble chart built with **D3.js**. The chart visualizes project data with dynamic clustering and tooltips, allowing users to explore data grouped by different categories such as cost, duration, and type.

## Features
- **Dynamic Clustering**: Group bubbles by:
  - Type Category
  - Cost Category
  - Duration Category
  - Year Category
- **Tooltips**: Display detailed project information (e.g., name, start year, cost, duration) when hovering over bubbles.
- **Cluster Labels**: Display group names above clusters.
- **Responsive Design**: Styled using **Bootstrap** for a clean and modern layout.

## Demo
The project is live on GitHub Pages: [Your GitHub Pages Link](#)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/bubble-chart-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bubble-chart-project
   ```
3. Open `index.html` in your browser:
   ```bash
   open index.html
   ```

## Files
- `index.html`: Main HTML file containing the structure and layout.
- `bubble-chart.js`: JavaScript file with D3.js logic for the chart.
- `projects.json`: Sample data file used to populate the chart.
- `README.md`: Documentation for the project.

## Usage
1. Open the project in your browser.
2. Use the dropdown menu to switch between clustering categories.
3. Hover over bubbles to see detailed tooltips.
4. Labels above clusters display group names dynamically.

## Example Data Format
The `projects.json` file contains the following structure:

```json
[
    {
        "name": "Project A",
        "start_year": 2022,
        "cost": 100000,
        "time": 12,
        "category": "environment",
        "type_cat": "environment",
        "cost_cat": "500k-1M",
        "duration_cat": "6Mt-1.5J",
        "year_cat": "2022-2024"
    }
]
```

## Built With
- **D3.js**: For creating the interactive visualization.
- **Bootstrap**: For styling and layout.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.


