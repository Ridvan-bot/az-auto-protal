const indexToText = (index: number): string => {
  const textMap = [
    'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 
    'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 
    'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 
    'eighteenth', 'nineteenth', 'twentieth'
  ];
  
  return textMap[index] || `${index + 1}th`;
};

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have all buttons on the home page', () => {
    cy.get('button').contains('Importera CSV').should('exist');
    cy.get('button').contains('Spara Mall').should('exist');
    cy.get('button').contains('Använd Mall').should('exist');
  });

  const files = [
    'test.csv',
    'noheader.csv',
    'noheader_tab.csv',
    'noheader_pipe.csv',
    'noheader_space.csv',
    'noheader_tilde.csv',
    'noheader_comma.csv',
    'header_comma.csv',
    'header_pipe.csv',
    'header_space.csv',
    'header_tab.csv',
    'header_tilde.csv',
    'header.csv',
    'TestImport_unika_headers.csv',
    'TestImport_utan_header.csv',
  ]

  files.forEach((fileName) => {
  it('should import a file via the "Importera CSV" button and verify the content', () => {
    const fileType = 'text/csv';
    
    let scroll

    cy.fixture(fileName).then(fileContent => {
      const rowCount = fileContent.split('\n').length;
      if (rowCount > 2) {
        scroll = true
      }
      else {
        scroll = false
      }
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName,
        mimeType: fileType
      });
    });

    cy.get('button').contains('Importera CSV').click();
    // Log all headers and count them
    cy.get('table thead tr th').each((header, index) => {
    }).then((headers) => {
      const headerCount = headers.length;
      console.log(`Total headers: ${headerCount}`);

      // Click each header and select the corresponding option from the dropdown
      headers.each((index, header) => {

        const indexPlusOne = index + 1;
        cy.get('table thead tr th').eq(index).click();
        cy.get('table thead tr th').eq(index).find('select').should('be.visible');
        cy.get('table thead tr th').eq(index).find('select').select(indexPlusOne);

      });
    });



    // Testing Utbetalningsdatum 
    cy.get('button').contains('Utbetalningsdatum').click();
    cy.get('.react-datepicker').should('be.visible');
    if (scroll == true) {
    cy.scrollTo('bottom');
    }
    cy.get('.react-datepicker__day--003').should('be.visible').click();


    // Testing Första dagen i föregående månad
    cy.get('input.input-custom[placeholder="Första dagen i föregående månad"]').clear().type('2024-01-05');
    cy.get('input.input-custom[placeholder="Första dagen i föregående månad"]').should('have.value', '2024-01-05');

    // Testing Sista dagen i föregående månad
    cy.get('input.input-custom[placeholder="Sista dagen i föregående månad"]').clear().type('2024-01-29');
    cy.get('input.input-custom[placeholder="Sista dagen i föregående månad"]').should('have.value', '2024-01-29');

    // Testing Alla Mallar
    cy.get('input.input-custom[placeholder="Ange mallens namn"]').clear().type('TestTemplet');
    cy.get('button').contains('Spara Mall').click();
    cy.get('input.input-custom[placeholder="Alla mallar"]').clear().type('TestTemplet');
    cy.get('ul').contains('li', 'TestTemplet').click();
    
    // Click Exportera button
    cy.get('button').contains('Exportera').click();
    cy.screenshot();
  });
  });
});